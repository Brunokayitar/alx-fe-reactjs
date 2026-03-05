import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post #{id}</h1>
      <p>This is the content of post {id}.</p>
    </div>
  );
};

export default Post;
