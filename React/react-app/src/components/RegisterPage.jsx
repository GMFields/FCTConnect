import { useState, useEffect } from "react";
import "./LoginPage.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPage() {
  useEffect(() => {
    library.add(faCrow);
  }, []);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidPassword(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (
    e
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validPassword) {
      try {
        const response = await fetch(
          `http://localhost:8080/rest/users/login?username=${email}&password=${password}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {
          console.log("SIUUUUUUUUU");
        }
        // handle the response
      } catch (error) {
        // handle the error
      }
    }
  };

  const validatePassword = (password) => {
    // regex pattern for password validation (minimum 8 characters)
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
  };

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
              <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign in
                </h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example18"
                    className={`form-control form-control-lg `}
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className={`form-control form-control-lg ${
                      !validPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {!validPassword && (
                    <div className="invalid-feedback">
                      Password must have at least 8 characters and contain at
                      least one uppercase letter, one lowercase letter, and one
                      number.
                    </div>
                  )}
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className={`form-control form-control-lg ${
                      !passwordsMatch ? "is-invalid" : ""
                    }`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />

                  {password.length > 0 && (
                    <div
                      className={`${
                        password === confirmPassword
                          ? "valid-feedback"
                          : "invalid-feedback"
                      }`}
                    >
                      {password === confirmPassword
                        ? "Passwords match!"
                        : "Passwords do not match. Try again."}
                    </div>
                  )}
                </div>
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block btn-blue"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
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
