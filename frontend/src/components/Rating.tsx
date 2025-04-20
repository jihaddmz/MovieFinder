import {Star} from "lucide-react";

interface Props {
    rating: number;
}

const Rating = ({rating}: Props) => {
    const normalizedRating = rating / 2; // convert the score to a 5 star score
    const wholeNumber = Math.floor(normalizedRating);
    const isThereAHalfStar = normalizedRating - wholeNumber >= 0.5;
    const array = Array.from(Array(wholeNumber)).map((_, i) => i);

    const emptyStarsNumber = 5 - wholeNumber - (isThereAHalfStar ? 1 : 0);
    const emptyWholeNumber = Math.floor(emptyStarsNumber);
    const emptyStars = Array.from(Array(emptyWholeNumber)).map((_, i) => i)

    return (
        <div className="flex items-center">
            {array.map((star) => (
                <Star key={star} className="text-secondary" fill="yellow"/>
            ))}
            {isThereAHalfStar && (
                <div className="flex items-center justify-center w-5 h-5">
                    <Star className="absolute text-secondary overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} fill="yellow"/>
                    <Star className="absolute text-gray-400 overflow-hidden" style={{ clipPath: 'inset(0 0 0 50%)' }}/>
                </div>
            )}
            {emptyStars.map((star) => (
                <Star key={star} className="text-gray-400"/>
            ))}
        </div>
    );
};

export default Rating;