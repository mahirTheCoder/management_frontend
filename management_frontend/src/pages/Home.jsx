import api from "../service/api";

const Home = () => {

  const testSignin = async () => {
    try {
      const res = await api.post("/auth/signin", {
        email: "hay@gmail.com",
        password: "123458",
      });

      console.log("SIGNIN SUCCESS:", res.data);

    } catch (error) {
      console.error("SIGNIN ERROR:", error);
    }
  };

  return (
    <div>
      <h1>Home working on frontend</h1>

      <button onClick={testSignin}>
        Test Signin
      </button>
    </div>
  );
};

export default Home;