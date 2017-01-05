#!/usr/bin/env perl
use 5.10.0;
use strict;
use warnings;
use feature qw(state);
use Amon2::Lite;
use Plack::Builder;
use LWP::Simple qw();
use Data::Dumper::Concise;
use Data::Validator;
use Sub::Install;
use Config::Pit;
use JSON;
use WebService::Hatena::Bookmark::Lite;
use URI::Escape;

__PACKAGE__->load_plugins(qw/Web::JSON/);
__PACKAGE__->load_plugins(qw/Web::Text/);

BEGIN {
    Sub::Install::install_sub({
        into => 'Amon2::Web',
        as   => 'render_error_json',
        code => sub {
            my ($self, $code, $data) = @_;
            my $res = $self->render_json($data);
            $res->status($code);
            return $res;
        },
    });

    for my $pair (
        ['put',     'PUT'],
        ['del',     'DELETE'],
        ['options', 'OPTIONS'],
    ) {
        Sub::Install::install_sub({
            into => __PACKAGE__,
            as   => $pair->[0],
            code => sub {
                router->connect($_[0], {code => $_[1], method => [$pair->[1]]}, {method => $pair->[1]});
            },
        });
    }

    Sub::Install::install_sub({
        into => 'Amon2::Web',
        as   => 'validate',
        code => sub {
            my ($self, $rule) = @_;
            my $validator = Data::Validator->new(%$rule)->with('NoThrow');;
            my $params = $self->req->parameters;

            $validator->validate(%$params);

            my @errors;
            if ($validator->has_errors) {
                my $errors = $validator->clear_errors;
                push @errors, $_->{message} for @$errors;
            }
            my $error_res = $self->render_error_json(400, { errors => \@errors }) if @errors;

            return $params, $error_res;
        },
    });
};

sub p ($) { warn Dumper shift }

sub url_for_edit { 'http://b.hatena.ne.jp/atom/edit?url=' . uri_escape(shift) }

state $CLIENT = do {
    my $config = pit_get('unread_manager', require => {
        'username' => 'your username on example',
        'password' => 'your password on example',
    });
    WebService::Hatena::Bookmark::Lite->new(
        username => $config->{username},
        password => $config->{password},
    );
};

put '/bookmark' => sub {
    my ($c) = @_;

    my ($args, $error_res) = $c->validate({
        url     => 'Str',
        tags    => 'ArrayRef[Str]',
        comment => { isa => 'Str', optional => 1 },
    });
    return $error_res if $error_res;

    # TODO
    $CLIENT->edit(
        edit_ep  => url_for_edit($args->{url}),
        tag      => $args->{tags},
        $args->{comment} ? (comment  => $args->{comment}) : (),
    );

    return $c->render_json({ ok => JSON::true });
};

get '/bookmarks/search_index', sub  {
    my ($c) = @_;
    return $c->render_text(LWP::Simple::get('http://b.hatena.ne.jp/Cside/search.data'));
};

del '/bookmark' => sub {
    my ($c) = @_;

    my ($args, $error_res) = $c->validate({
        urls => 'ArrayRef[Str]',
    });
    return $error_res if $error_res;

    for my $url (@{$args->{urls}}) {
        $CLIENT->delete(
            edit_ep  => url_for_edit($url),
        );
    }

    return $c->render_json({ ok => JSON::true });
};

options '/bookmark', sub {
    my ($c) = @_;
    return $c->render_json({ ok => JSON::true });
};

builder {
    ## TODO: if dev
    enable sub {
        my $app = shift;
        sub {
            my $res = $app->($_[0]);

            my $header = Plack::Util::headers($res->[1]);

            $header->set('Access-Control-Allow-Origin' => '*');
            $header->set('Access-Control-Allow-Methods' => join(', ', qw( POST GET PUT DELETE HEAD OPTIONS )));
            $header->set('Access-Control-Allow-Headers' => join(', ', qw( Content-Type X-Requested-With )));

            return $res;
        };
    };
    enable "DebugRequestParams";
    __PACKAGE__->to_app();
};
