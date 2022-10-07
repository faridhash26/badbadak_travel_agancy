import { GetServerSideProps } from "next";
import { resort } from "../../services/resort";
interface Resortinterface {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}
const ResortDetails = ({ data }: any) => {
  console.log("asd", data.resort);

  const addToCartHandler = (info: Resortinterface) => {
    console.log("adding data");
  };

  return (
    <div className="resort-details-wrapper">
      <div className="">
        <div className="">
          {/* <Image
          className="image"
          width={260}
          height={260}
          layout="responsive"
          src={data.resort && data.resort.imageUrl}
          alt="Picture of the author"
        /> */}
        </div>
        <div className="resort-info-container">
          <div className="resort-title">{data.resort.title}</div>
          <div className="resort-description"> {data.resort.description}</div>
          <div className="resort-price">{data.resort.price}</div>
          <button
            className="add-to-cart"
            onClick={() => addToCartHandler(data.resort)}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await resort.get(`/resort/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};
export default ResortDetails;
