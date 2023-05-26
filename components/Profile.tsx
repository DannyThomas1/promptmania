import Loading from './Loading';
import PromptCard from './PromptCard';

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  loading,
}: {
  name: string;
  desc: string;
  data: any[];
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
  loading: boolean;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>

      <p className="desc text-left">{desc}</p>

      {loading ? (
        <Loading />
      ) : (
        <div className="mt-10 prompt_layout">
          {data?.map(post => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
