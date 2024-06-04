const SectionTitle = ({ title }) => {
    return (
        <div>
            <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-[#fcfcfd] to-[#ddff00] capitalize text-center bg-clip-text text-transparent">{title}</h1>
        </div>
    );
};

export default SectionTitle;