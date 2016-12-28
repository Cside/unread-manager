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

__PACKAGE__->load_plugins(qw/Web::JSON/);

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
Sub::Install::install_sub({
    into => 'Amon2::Web',
    as   => 'validate',
    code => sub {
        my ($self, $rule, $params) = @_;
        my $validator = Data::Validator->new(%$rule)->with('NoThrow');;
        $validator->validate(%$params);

        my @errors;
        if ($validator->has_errors) {
            my $errors = $validator->clear_errors;
            push @errors, sprintf("[$_->{name}] $_->{message}") for @$errors;
        }
        my $error_res = $self->render_error_json(400, { errors => \@errors }) if @errors;

        return $params, $error_res;
    },
});

sub p ($) { warn Dumper shift }

get '/' => sub {
    my ($c) = @_;

    my ($args, $error_res) = $c->validate({
        foo => 'Str',
    }, $c->req->parameters);
    return $error_res if $error_res;

    return $c->render_json({ hello => 'world' });
};

builder {
    enable "DebugRequestParams";
    __PACKAGE__->to_app();
};
