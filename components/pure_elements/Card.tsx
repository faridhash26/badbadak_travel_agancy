import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: number;
  title: string;
  imageUrl: string;
  onclick: () => void;
}
const Card = ({ id, title, imageUrl, onclick }: CardProps) => {
  return (
    <div className="card-wrapper">
      <div className="card-image">
        <Image
          className="image"
          width={260}
          height={260}
          layout="responsive"
          src={imageUrl && imageUrl}
          alt="Picture of the author"
        />
      </div>
      <div className="card-info">
        <p className="card-title">{title}</p>
        <div className="group-buttons">
          <div className="more-info-button">
            <Link href={`/resort/${id}`}>moreInfo</Link>
          </div>
          <button className="add-bucket-button" onClick={onclick}>add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
