const ListITem = ({ item,img }) => {
  return (
    <div className="pListItem">
      <img
        src={img}
        alt={item.type} 
        className="pListImg"
      />
      <div className="pListTitles">
        <h1>{item.type}</h1>
        <h2>{item.count} hotels</h2>
      </div>
    </div>
  );
};

export default ListITem;