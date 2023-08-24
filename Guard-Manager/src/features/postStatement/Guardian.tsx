import { memo } from "react";

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

interface PostProps {
    guardian: string;
    onChange: (value: string) => void;
    position: string;
    veaponOption?: boolean;
}

const Guardian = memo(function ({ guardian, onChange, position, veaponOption }: PostProps) {
    const [rank, name='', veapon='0'] = guardian.split('-');

    function setValue(rank: number, name: string, veapon: number) {
        if (veaponOption) {
            onChange(`${rank}-${name}-${+veapon}`);
        } else {
            onChange(`${rank}-${name}`);
        }
    }

    return(
        <li key={position} className="guardian">
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
        </li>
    )
});

export default Guardian;