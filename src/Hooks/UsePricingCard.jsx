import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UsePricingCard = () => {
    const axiosPublic = UseAxiosPublic()
    const { data: pricingCard = [], refetch } = useQuery({
        queryKey: ["priceCard"],
        queryFn: async () => {
            const result = await axiosPublic.get('pricingCard');
            return result.data;
        }
    })
    return [pricingCard, refetch]
};

export default UsePricingCard;