const SectionTitle = ({ title }) => {
    return (
        <div className="flex justify-center mb-10">
            <h1 className="text-2xl md:text-5xl font-bold capitalize text-center pb-2 bg-clip-text text-black border-b-4 border-b-[#2AB16E]">{title}</h1>
        </div>
    );
};

export default SectionTitle;