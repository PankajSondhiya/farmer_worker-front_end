const GetTimeAgo = ({ dateString }) => {
  function getTimeAgo() {
    const date = new Date(dateString);
    const now = new Date();

    const differenceInSec = Math.floor((now - date) / 1000);

    if (differenceInSec < 60) return `${differenceInSec} seconds ago`;
    const diffInMin = Math.floor(differenceInSec / 60);
    if (diffInMin < 60) return `${diffInMin} mins ago`;
    const diffInHours = Math.floor(diffInMin / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonth = Math.floor(diffInDays / 30);
    if (diffInMonth < 12) return `${diffInMonth} months ago`;
    const diffInYears = Math.floor(diffInMonth / 12);
    return `${diffInYears} years ago`;
  }
  return (
    <>
      <span>{getTimeAgo()}</span>
    </>
  );
};

export default GetTimeAgo;
