import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import campus from "../img/campus.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [name, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validPwd) {
      try {
        const response = await fetch(
          `https://helical-ascent-385614.oa.r.appspot.com/rest/users/login?username=${email}&password=${password}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("SIUUUUUUUUU");
        }
        // handle the response
      } catch (error) {
        // handle the error
      }
    }
  };

  return (
    <div>
      <img src={campus} alt="" />
      <div className="auth-form-container">
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validName && name ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              ref={userRef}
              placeholder="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={!validName}
              aria-describedby="uidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />

            <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Min 4 characters.<br />
            </p>
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validEmail && email ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              aria-invalid={!validEmail}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email<br />
            </p>
            <label htmlFor="password">
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validPwd && password ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
              id="password"
              name="password"
              aria-invalid={!validPwd}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must include uppercase and lowercase letters, a number and a special character.<br />
            </p>
            <label htmlFor="confirmPwd">
              Confirmed password
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validMatch && matchPassword ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              type="password"
              placeholder="password"
              id="confirmPwd"
              name="confirmPwd"
              required
              aria-invalid={!validMatch}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.<br />
            </p>
            <button disabled={!validName || !validPwd || !validMatch}>Register </button>
            <p>Already have an Account?</p>
            <button onClick={() => props.onFormSwitch('login')}>Sign In </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
