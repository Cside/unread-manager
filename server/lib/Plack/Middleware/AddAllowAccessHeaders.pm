package Plack::Middleware::AddAllowAccessHeaders;
use strict;
use warnings;
use utf8;
use parent qw(Plack::Middleware);

use Data::Dumper::Concise;
sub p ($) { warn Dumper shift }
sub call {
    my($self, $env) = @_;

    my $res = $self->app->($env);
    p $res;
    $res->header('Access-Control-Allow-Origin' => '*');
    $res->header('Access-Control-Allow-Methods' => join(', ', qw( POST GET PUT DELETE HEAD OPTIONS )));
    $res->header('Access-Control-Allow-Headers' => join(', ', qw( Content-Type X-Requested-With )));

    return $res;
}

1;
