import Cardcomp from "./_components/card";

const ReviewProperty = ({ params }: { params?: { id: string } }) => {
  return (
    <div>
      <Cardcomp id={params?.id!} />
    </div>
  );
};

export default ReviewProperty;
