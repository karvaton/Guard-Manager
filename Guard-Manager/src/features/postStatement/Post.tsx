import { memo } from "react";
import Guardian from "./Guardian";

interface PostProps {
    postNumber: number;
    guardians: string[];
    onChange: (index: number) => (newValue: string) => void;
}

const Post = memo(function ({postNumber, guardians, onChange}: PostProps) {
    return(
        <li className="post" key={postNumber}>
            <p>{postNumber + 1}</p>
            <ul>
                {guardians.map((guardian, shift) => (
                    <Guardian
                        key={shift}
                        guardian={guardian}
                        onChange={onChange(postNumber*3 + shift + 4)}
                        position={`${shift + 1}`}
                        veaponOption
                    />
                ))}
            </ul>
        </li>
    )
});

export default Post;