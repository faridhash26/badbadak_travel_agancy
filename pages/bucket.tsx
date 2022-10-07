import Image from "next/image";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

import Main from "../components/ui_layout/Main";
import { ReduxStoreModel } from "../model/redux/redux-store-model";

const Bucket = () => {
  const buckets: ReduxStoreModel["buckets"] = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["buckets"]
  >((store: ReduxStoreModel) => store.buckets);
  const deleteItemHandler = (Itemid: number) => {
    console.log("delete item");
  };
  return (
    <div className="bucket-wrapper">
      <div className="bucket-continer">
        <div className="buckets">
          {buckets.length !== 0 ? (
            buckets?.map((item) => (
              <div className="bocket-item" key={item.id}>
                <div className="bocket-item-image">
                  <Image
                    className="bocket-image"
                    width={60}
                    height={60}
                    layout="responsive"
                    src={item.imageUrl}
                    alt="Picture of the author"
                  />
                </div>
                <div className="bocket-item-title">{item.title}</div>
                <div className="bocket-item-price">price :{item.price} </div>
                <button
                  className="bocket-item-delete-button"
                  onClick={() => deleteItemHandler(item.id)}
                >
                  delete item
                </button>
              </div>
            ))
          ) : (
            <div className="empty-bucket">bucket empty</div>
          )}
        </div>
        <div className="payment">payment</div>
      </div>
    </div>
  );
};

Bucket.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default Bucket;
