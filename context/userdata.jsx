import { useSession } from "next-auth/react";
import { createContext } from "react";
import { useQuery } from "urql";

export const Userdatacontext = createContext(null);

export default function UserData({ children }) {
  const { data: session } = useSession();

  const GET_USER_DATA = `
    query GetAccount($email: String) {
      getAccount(email: $email) {
        accountBalance
        id
        image
        name
        phoneNumber
        smsNotification
        tags {
          cancelledAt
          createdAt
          serial
          id
        }
        email
        emailNotification
      }
    }
    `;

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: GET_USER_DATA,
    variables: {
      email: session?.user?.email,
    },
  });

  return (
    <Userdatacontext.Provider
      value={{ user: data?.getAccount, refreshUser: reexecuteQuery }}
    >
      {children}
    </Userdatacontext.Provider>
  );
}
