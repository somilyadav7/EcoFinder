import { Link } from "react-router-dom";


const Recycle = () => {
  const recycleItems = [
    {
      itemName: "Smartphone",
      description: "Recycle your old smartphones responsibly.",
      recyclingProcess: "We ensure proper dismantling and recycling of electronic components.",
      specialInstructions: "Make sure to remove any personal data before recycling.",
      icon: <i className="fa-solid fa-mobile text-xl"></i>
    },
    {
      itemName: "Laptop",
      description: "Dispose of your old laptops in an eco-friendly way.",
      recyclingProcess: "Our recycling process adheres to environmental standards.",
      specialInstructions: "Please remove batteries before recycling.",
      icon: <i className="fa-solid fa-laptop"></i>
    },
    {
      itemName: "Accessories",
      description: "Recycle various electronic accessories responsibly.",
      recyclingProcess: "We separate and recycle different materials for each accessory.",
      specialInstructions: "Bundle cables together before dropping off.",
      icon: <i className="fa-solid fa-headphones"></i>
    },
    {
      itemName: "Television",
      description: "Environmentally friendly disposal of old televisions.",
      recyclingProcess: "Proper disposal of harmful components to minimize environmental impact.",
      specialInstructions: "Bring remote controls and power cables for proper recycling.",
      icon: <i className="fa-solid fa-tv"></i>
    },
    {
      itemName: "Refrigerator",
      description: "Eco-conscious disposal of old refrigerators.",
      recyclingProcess: "Safe removal and recycling of refrigerants and other components.",
      specialInstructions: "Ensure the refrigerator is defrosted before recycling.",
      icon: <i className="fa-solid fa-calendar"></i>
    },
    {
      itemName: "Other",
      description: "Responsible recycling of any other Electronic Devices.",
      recyclingProcess: "Proper dismantling and recycling of metal and electronic components.",
      specialInstructions: "Ensure it's not working before recycling.",
      icon: <i className="fa-solid fa-microchip"></i>
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mt-4 text-center text-blue-700">Recycle Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {recycleItems.map((item, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold p-2">{item.itemName}</h3>
            {item.icon}
          </div>
          <p className="text-gray-600 text-left">{item.description}</p>
          <p className="text-gray-600 text-left">{item.recyclingProcess}</p>
          <p className="text-gray-600 text-left">{item.specialInstructions}</p>
          <div className="mt-2">
          <Link to={`/recycle/${item.itemName}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Recycle Now
          </Link>
          </div>
        </div>
      ))}
    </div>
    </>

  );

};

export default Recycle;
