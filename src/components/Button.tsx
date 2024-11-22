interface IconButtonProps {
  icon: React.ElementType;
  text: string;
}
const Button = ({ icon: Icon, text }: IconButtonProps) => {
  return (
    <button className="flex  w-full h-[40px] items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-8 py-6 shadow-md">
      <Icon className=" w-5 h-5 mr-2" />

      <span className="text-gray-700 font-medium">{text}</span>
    </button>
  );
};

export default Button;
