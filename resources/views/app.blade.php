<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{{ \Session::token() }}}">
  <meta name="google-site-verification" content="QAR0qRI9z2I46V4hkRA-Dkhfp0kwvG5IJ1-vmIZ-fE8">
  <title>{{ env('SITE_NAME') }}</title>
  @yield('styles')
  <link href="/css/app.css" rel="stylesheet">


  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

</head>

<body>
  @include('partials.nav')
  @yield('content')
  <script src="/js/vendor/vendor.js"></script>
  <script src="/js/app.js"></script>
  @yield('scripts')
</body>
</html>