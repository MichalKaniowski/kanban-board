import {
  List,
  ModifiedCategory,
} from "../components/kanbanboard/KanbanBoard.types";
// import { db, auth } from "../components/auth/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// make this function work on category type
export function transformFirebaseObject(firebaseObject: any) {
  if (
    firebaseObject &&
    firebaseObject.mapValue &&
    firebaseObject.mapValue.fields
  ) {
    const transformedObject: any = {};

    for (const key in firebaseObject.mapValue.fields) {
      if (
        firebaseObject.mapValue.fields.hasOwnProperty(key) &&
        firebaseObject.mapValue.fields[key].hasOwnProperty("stringValue")
      ) {
        transformedObject[key] =
          firebaseObject.mapValue.fields[key].stringValue;
      } else if (
        firebaseObject.mapValue.fields.hasOwnProperty(key) &&
        firebaseObject.mapValue.fields[key].hasOwnProperty("arrayValue")
      ) {
        const arrayValues =
          firebaseObject.mapValue.fields[key].arrayValue.values;

        if (Array.isArray(arrayValues)) {
          transformedObject[key] = arrayValues.map((item) =>
            transformFirebaseObject(item)
          );
        } else {
          transformedObject[key] = [];
        }
      } else if (
        firebaseObject.mapValue.fields.hasOwnProperty(key) &&
        firebaseObject.mapValue.fields[key].hasOwnProperty("mapValue")
      ) {
        transformedObject[key] = transformFirebaseObject(
          firebaseObject.mapValue.fields[key].mapValue
        );
      }
    }

    return transformedObject;
  } else if (firebaseObject && firebaseObject.stringValue) {
    return firebaseObject.stringValue;
  }

  return firebaseObject;
}

export async function writeData(email: string, data: any) {
  const user = {
    email: email,
    ...data,
  };

  const response = await fetch(
    "https://fir-log-in-3b092-default-rtdb.firebaseio.com/users.json",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }
  );

  // const resData = await response.json();
  // return resData;
}

export async function getData(userId: string) {
  const response = await fetch(
    // `https://fir-log-in-3b092-default-rtdb.firebaseio.com/users/${userId}`
    "https://fir-log-in-3b092-default-rtdb.firebaseio.com/users.json/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}

// export async function getLists(email: string, onSave: (lists: List[]) => void) {
//   const usersCollectionRef = collection(db, "testusers");
//   const userData = await getDocs(usersCollectionRef);
//   const filteredUserData = userData.docs.map((doc) => ({
//     id: doc.id,
//     ...doc,
//   }));

//   filteredUserData.forEach(async (doc) => {
//     const documentEmail = await doc?._document.data.value.mapValue.fields.email
//       .stringValue;

//     if (documentEmail === email) {
//       const lists = await doc?._document.data.value.mapValue.fields.lists //arrayValue
//         .arrayValue.values;
//       const transformedLists = lists.map((list) =>
//         transformFirebaseObject(list)
//       );

//       onSave(transformedLists);
//       return;
//     }
//   });
// }

export async function saveUserData(
  userEmail: string,
  lists: List[],
  categories: ModifiedCategory[]
) {
  const userDoc = doc(db, "testusers", "P2kGzRAxPRpwbZs2kRaR");
  //MAP over docs like you did in getLists function and get correct doc
  //bcs now it's only working for this one user
  await updateDoc(userDoc, {
    lists: lists,
    categories: categories,
  });
}
