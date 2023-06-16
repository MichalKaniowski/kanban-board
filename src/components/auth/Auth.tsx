import { useState, useContext, useRef } from "react";
import styles from "./Auth.module.css";
import { UserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  initialLists,
  initialCategories,
  KanbanContext,
} from "../../store/KanbanContext";
import { transformFirebaseObject, writeData } from "../../utils/kanban-utils";
import { getData } from "../../utils/kanban-utils";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const navigate = useNavigate();

  const kanbanContext = useContext(KanbanContext);
  const userContext = useContext(UserContext);

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const headingText = isLoginMode ? "Log in" : "Sign up";
  const switcherText = isLoginMode ? "Sign up" : "Log in";

  async function fetchData() {
    // const usersCollectionRef = collection(db, "testusers");
    // const data = await getDocs(usersCollectionRef);
    // const modifiedData = data.docs.map((doc) => ({ id: doc.id, ...doc }));

    // modifiedData.forEach(async (doc) => {
    //   const documentEmail = await doc?._document.data.value.mapValue.fields
    //     .email.stringValue;

    //   if (documentEmail === auth.currentUser.email) {
    //     const lists = await doc?._document.data.value.mapValue.fields.lists
    //       .arrayValue.values;
    //     const transformedLists = lists.map((list) =>
    //       transformFirebaseObject(list)
    //     );

    //     kanbanContext.onContextSet(transformedLists, initialCategories); //change initial categories to categories from db
    //     console.log(
    //       "Lists got from database right after logging in: ",
    //       transformedLists
    //     );
    //   }
    // });

    const data = await getData("-NY3A7UHQNJvyL7wUHow");
    console.log(data);
  }
  fetchData();

  async function saveUserToDatabase() {
    // const testUsersCollectionRef = collection(db, "testusers");
    // addDoc(testUsersCollectionRef, {
    //   email: emailRef.current.value,
    //   lists: initialLists,
    //   categories: initialCategories,
    // });
    await writeData(auth?.currentUser?.email, {
      lists: initialLists,
      categories: initialCategories,
    });
  }

  function signUp() {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        userContext.onSetUser(emailRef.current.value, "signup");
        saveUserToDatabase();
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  function logIn() {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        userContext.onSetUser(emailRef.current.value, "login");
        getData();
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (isLoginMode) {
      logIn();
    } else {
      signUp();
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <h1>{headingText}</h1>
      {/* login with google */}
      <label>
        <input ref={emailRef} type="email" placeholder="Email" />
      </label>

      <label>
        <input ref={passwordRef} type="password" placeholder="Password" />
      </label>

      <button>{headingText}</button>
      <div>
        {/* <p>Already have an account?</p> */}
        <p onClick={() => setIsLoginMode((prevValue) => !prevValue)}>
          {switcherText}
        </p>
      </div>
    </form>
  );
}
