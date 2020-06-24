<template>
  <div class="container">
    <div class="row-fluid">
      <div
        class="hidden-xsd-none d-sm-block"
        style="height: 100px;"
      >
        <div
          class="col-lg-6"
          style="margin: auto;"
        >
          <div class="block rounded">
            <div class="content">
              <p class="hidden-xs d-none d-sm-block float-left col-sm-8 alt-wrapping text-white">
                Sign in to: <br>
                <strong>https://itsc-flipbook.cech.uc.edu</strong>
              </p>
              <img
                class="float-right logo"
                style="max-height: 74px; max-width: 130px; margin-bottom: 10px;"
                alt="University of Cincinnati"
              >
              <div class="clear">
                <div>
                  <div class="form-group">
                    <div class="col-md-12">
                      <input
                        v-model="username"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Username"
                        autocorrect="off"
                        autocapitalize="none"
                        autofocus="autofocus"
                        @keydown.enter="login"
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12">
                      <input
                        v-model="password"
                        type="password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        autocomplete="off"
                        @keydown.enter="login"
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <div class=" col-md-12">
                      <button
                        class="btn btn-block btn-lg"
                        style="color: white;"
                        @click="login"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 text-white">
                <p>
                  Need Help?
                  <br>
                  <a
                    href="https://www.uc.edu/PSS/public/ForgottenUsername"
                    rel="external"
                    target="_blank"
                  >Get My Username</a><br>
                  <a
                    href="https://www.uc.edu/PSS"
                    rel="external"
                    target="_blank"
                  >Change My Password</a><br>
                  <a
                    href="https://www.uc.edu/PSS/public/ForgottenPassword"
                    rel="external"
                    target="_blank"
                  >Forgot My Password</a><br>
                  Call the <a
                    href="http://www.uc.edu/ithelp"
                    rel="external"
                    target="_blank"
                  >IT@UC Service Desk</a> at 513-556-HELP(4357) option 2 or 866-397-3382 option 2.
                  <br>
                </p>
                <aside role="complementary">
                  <br><p>
                    By using this service you agree to adhere to<br>
                    <a
                      href="http://www.uc.edu/infosec/policies.html"
                      rel="external"
                      target="_blank"
                      title="UC Information Security Policies"
                    >UC Information Security Policies</a>
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginService } from '@/services/Login.service';
import toastr from '@/plugins/notifications';

export default {
  name: `LoginRoot`,
  data() {
    return {
      username: ``,
      password: ``,
    };
  },
  methods: {
    async login() {
      try {
        if (this.username && this.password) {
          await LoginService.authenticate(this.username, this.password);
          window.location.href = `/admin`;
        } else {
          toastr.error(`You must provide a username and password`);
        }
      } catch {
        toastr.error(`Invalid username or password`);
      }
    },
  },
};
</script>

<style lang="scss">
  @import '~bootstrap';
  @import '~bootstrap-vue';
  @import '~toastr';
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,300');

  .logo {
    content: url('~@/assets/UC_Logo_White.png');
  }

  * {
    font-family: "Open Sans", sans-serif !important;
  }

  html {
    background: url('~@/assets/University-of-Cincinnati-Main-Campus-Ofer-Wolberger-for-NYT.jpg');
    background-position-x: center;
    background-position-y: top;
    background-attachment: fixed;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  body {
    padding-top: 2rem;
    background-color: transparent;
  }

  .block {
    background-color: rgba(0,0,0,0.8);
    padding: 20px;
  }

  .alt-wrapping {
    word-wrap: break-word;
  }

  p {
    font-size: 14px;
  }

  a {
    color: white;
    text-decoration: underline;

    &:hover {
      color: white;
      text-decoration: underline;
    }
  }

  button {
    background-color: #e00122 !important;

    &:hover {
      background-color: #ec0326 !important;
    }
  }

  .clear {
    clear: both;
    padding-top: 10px;
  }

  .placeholder {
    color: #aaa;
  }

  input,
  textarea {
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: none;
    padding: 3px 0 3px 15px;
    margin: 5px 1px 3px 0;
    border: 2px solid #ddd;

    &:focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      padding: 3px 0 3px 15px;
      margin: 5px 1px 3px 0;
      border: 2px solid rgba(81, 203, 238, 1);
    }
  }
</style>
