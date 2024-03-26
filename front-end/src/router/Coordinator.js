export const goToLoginPage = (navigate) => {
    navigate("/Login/");
  };
  export const goToSignUpPage = (navigate) => {
    navigate(`/SignUp/`);
  };
  export const goToHome = (navigate) => {
    navigate(`/`);
  };
  export const goToPost = (navigate) => {
    navigate(`/Post/`);
  };
  export const goToSettings = (navigate) => {
    navigate(`/Settings/`);
  };
  export const goToNotifications = (navigate) => {
    navigate(`/Notifications/`);
  };
  export const goToProfile = (navigate, userId) => {
    navigate(`/Profile/${userId}`);
  };
  export const goToSearch = (navigate) => {
    navigate(`/Search/`);
  };
  export const goToPostDetailPage = (navigate, postId) => {
    navigate(`/postDetailPage/${postId}`);
  };