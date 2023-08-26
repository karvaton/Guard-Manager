import { memo, useEffect, useRef, useState } from "react";
import dragImg from '../../icons/drag.png';

const ranks = [
    "солд.",
    "ст.солд",
    "мол.с-нт",
    "с-нт",
    "ст.с-нт",
    "гол.с-нт",
    "шт.с-нт",
    "мс.с-нт",
    "мол.л-нт",
    "л-нт",
    "ст.л-нт",
    "к-н",
    "м-р"
];

const veapons = [
    "АК-74",
    "РПК",
    "АКС-74У",
]

interface GuardianProps {
    id: number;
    guardian: string;
    onChange: (value: string) => void;
    position: string;
    veaponOption?: boolean;
    onReplace: (index: number) => void;
    onDrag: (start: number | null) => void;
    // onDragEnter: (start: number) => void;
}

const Guardian = memo(function ({ guardian, id, onChange, position, veaponOption, onReplace, onDrag }: GuardianProps) {
    const [rank, name='', veapon='0'] = guardian.split('-');

    function setValue(rank: number, name: string, veapon: number) {
        if (veaponOption) {
            onChange(`${rank}-${name}-${+veapon}`);
        } else {
            onChange(`${rank}-${name}`);
        }
    }

    function startDragging(e: React.DragEvent<HTMLLIElement>) {
        onDrag(id);
        // setDragging(true);
    }
    
    function drop(e: React.DragEvent<HTMLLIElement>) {
        onDrag(null);
        // setDragging(false);
    }
    
    function dragEnter(e: React.DragEvent<HTMLLIElement>) {
        onReplace(id);
        onDrag(id);
    }

    return (
        <li
            key={position} 
            className="guardian"
            draggable
            onDragEnter={dragEnter}
            onDragStart={startDragging}
            onDragEnd={drop}
        >
            <p>{position}</p>
            <div className="guardian guardian_field">
                <select 
                    name="rank" 
                    id="rank" 
                    value={rank} 
                    onChange={e => setValue(+e.target.value, name, parseInt(veapon))}
                >
                    {ranks.map((rank, index) =>
                        <option key={index} value={index}>{rank}</option>
                    )}
                </select>
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setValue(parseInt(rank) || 0, e.target.value, parseInt(veapon))}
                />
                {veaponOption ? (
                            // onChange={e => setValue(parseInt(rank) || 0, name, e.target.checked)}
                    <select 
                        className="veapon" 
                        value={parseInt(veapon)} 
                        onChange={e => setValue(parseInt(rank), name, parseInt(e.target.value))}
                    >
                        {veapons.map((veapon, id) => 
                            <option key={id} value={id}>{veapon}</option>
                        )}
                    </select>
                ) : null}
                    </div>
            <div className="drag_img">
                <img src={dragImg} alt="" draggable={false} />
            </div>
        </li>
    );
});

export default Guardian;