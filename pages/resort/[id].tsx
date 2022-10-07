import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import Main from "../../components/ui_layout/Main";
import { REDUX_ACTION } from "../../enum/redux-action.enum";
import { ReduxStoreModel } from "../../model/redux/redux-store-model";
import { resort } from "../../services/resort";

interface Resortinterface {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
}
const ResortDetails = ({ data }: any) => {
  const dispatch = useDispatch();

  const buckets: ReduxStoreModel["buckets"] = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["buckets"]
  >((store: ReduxStoreModel) => store.buckets);

  const addToCartHandler = (info: Resortinterface) => {
    dispatch({
      type: REDUX_ACTION.ADD_BUCKET,
      payload: info,
    });
  };
  const disabledAddbutton = (itemId: number) => {
    console.log("itemId", itemId);

    const index = buckets.findIndex((item) => item.id === itemId);

    if (index === -1) {
      return false;
    }
    return true;
  };
  return (
    <div className="resort-details-wrapper">
      <div className="resort-contaier">
        <div className="image-wrapper">
          <Image
            className="image"
            width={260}
            height={260}
            layout="responsive"
            src={data.resort && data.resort.imageUrl}
            alt="Picture of the author"
          />
        </div>
        <div className="resort-info-container">
          <h2 className="resort-title">{data.resort.title}</h2>
          <p className="resort-description"> {data.resort.description}</p>
          <p className="resort-price">
            price : <span>{data.resort.price}</span>
          </p>
          <button
            className="add-to-cart"
            disabled={disabledAddbutton(Number(data.resort.id))}
            onClick={() => addToCartHandler(data.resort)}
          >
            add to cart
          </button>
          <div className="bucket-button">
            <Link href="/bucket">go to bucket</Link>
          </div>
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

ResortDetails.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default ResortDetails;
