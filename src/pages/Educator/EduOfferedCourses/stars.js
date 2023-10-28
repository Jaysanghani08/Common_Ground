import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    debugger;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  
    .icon {
      font-size: 1.5rem;
      color: yellow;
    }

    .empty-icon {
      font-size: 2.6rem;
    }

    @media(max-width: 600px) {
      .icon-style {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        justify-content: flex-start;
      }    
      .icon {
        fontsize : 0 rem;
      }

      .empty-icon{
        fontsize : 0 rem
      }
    }
    
  }
`;

export default Star;