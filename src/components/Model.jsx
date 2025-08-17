import "../App.css";
const Model = ({ news, onClose }) => {
  return (
    <>
      <div className="modal-overlay">
        <div  onClick={(e) => e.stopPropagation()}> 
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
          <div className="modal-header">
            <h2>{news.headline}</h2>
          
        </div>
        <div className="modal-body">
          <p>{news.news}</p>
        </div>
        <div className="modal-footer">
          <p>{news.publisher}</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Model;
