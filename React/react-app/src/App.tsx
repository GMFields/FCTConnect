import { useEffect } from "react";
import "./LoginPage.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPage() {
  useEffect(() => {
    library.add(faCrow);
  }, []);

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <FontAwesomeIcon
                icon="crow"
                className="fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "#709085" }}
              />
              <span className="h1 fw-bold mb-0"></span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </div>
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block btn-blue"
                    type="button"
                  >
                    Login
                  </button>
                </div>
                <p className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?{" "}
                  <a href="#!" className="link-blue">
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://www.fct.unl.pt/sites/default/files/images/nova_4.png"
              alt="Login image"
              className="w-100 vh-70"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
