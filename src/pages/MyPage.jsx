import { Helmet } from "react-helmet";

const MyPage = () => {
  return (
    <div>
      <Helmet>
        <title>Task Manager | Organize Your Tasks</title>
        <meta name="description" content="A simple and efficient task manager to boost productivity." />
        <meta name="keywords" content="task manager, to-do list, productivity, planner" />
        <meta property="og:title" content="Task Manager - Organize Your Tasks" />
        <meta property="og:description" content="Manage your tasks easily with our simple interface." />
        <meta property="og:image" content="https://yourwebsite.com/preview-image.jpg" />
      </Helmet>

      <h1>Welcome to Task Manager</h1>
    </div>
  );
};

export default MyPage;
