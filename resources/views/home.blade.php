<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.25/vue.js"></script>
        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
      <div id="app">
        <div class="container">
            <div class="content">
                <div class="title">@{{ message }}</div>
            </div>
        </div>
      </div>
      <script>
        new Vue({
          el: "#app",
          data: {
            message: "Howdy"
          }
        })
      </script>
    </body>
</html>
