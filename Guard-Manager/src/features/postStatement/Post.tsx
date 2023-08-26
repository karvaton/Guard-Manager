import { memo } from "react";
import Guardian from "./Guardian";

interface PostProps {
    postNumber: number;
    guardians: string[];
    onChange: (index: number) => (newValue: string) => void;
    onReplace: (index: number) => void;
    onDrag: (start: number | null) => void;
}

const Post = memo(function ({postNumber, guardians, onChange, onReplace, onDrag }: PostProps) {
    return(
        <li className="post" key={postNumber}>
            <p>{postNumber + 1} пост</p>
            <ol>
                {guardians.map((guardian, shift) => (
                    <Guardian
                        key={shift}
                        guardian={guardian}
                        onChange={onChange(postNumber*3 + shift + 4)}
                        position={`${shift + 1}`}
                        veaponOption
                        id={(postNumber*3+ shift) + 4}
                        onReplace={onReplace}
                        onDrag={onDrag}
                    />
                ))}
            </ol>
        </li>
    )
});

export default Post;