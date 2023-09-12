import Users from "./../model/user.model";
import Feedbacks from "./../model/feedback.model";

const initialdb = async () => {
  console.log("----- debug server initialdb");
  const newUser = new Users({
    username: "rowe",
    email: "demo@devias.io",
    password: "P@ssw0rd123",
    role: "admin",
  });

  newUser.save();

  const newFeedback = new Feedbacks({
    username: "rowe",
    email: "demo@devias.io",
    context: "Hello, looks good!!!",
    country: "US",
  });

  newFeedback.save();
};

export default initialdb;
