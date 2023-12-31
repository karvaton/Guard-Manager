import { useEffect, useState } from "react";
import './options.css';
import api from '../postStatement/api';


interface OptionsProps {
    onLoad: Function;
    onShift: Function;
    onClear: Function;
}

const beforeToday = new Date(Date.now() - 1000*60*60*24*2).toISOString().substring(0, 10);

export default function Options({ onLoad, onShift, onClear }: OptionsProps) {
    const [date, setDate] = useState<string>(beforeToday);
    const [active, setActive] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [squad, setSquad] = useState<string[]>();
    const [isExist, setIsExist] = useState<boolean>(false);

    async function load() {
        const shortDate = date.replaceAll('-', '');
        const res = await api.getData(shortDate);
        const id = res.slice(0, 1);
        const data  = res.slice(1);
        const squad = Array(22 - data.length).fill('');
        setIsExist(!!res.length);
        setSquad(data.concat(squad));
        setId(+id || 0);
    }

    useEffect(() => {
        if (active) {
            load();
        }
    }, [date, active]);

    return (
        <div id="options">
            <div className="load-data">
                {active ? (
                    <>
                        <label htmlFor="date">Завантажити дані за</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <button 
                            disabled={!isExist}
                            onClick={() => {
                                onLoad({ id, squad, date });
                                setActive(false);
                            }}
                        >
                            ОК
                        </button>
                        <button onClick={() => setActive(false)}>Скасувати</button>
                    </>
                ) : (
                    <button onClick={() => setActive(true)}>Завантажити дані</button>
                )}
            </div>

            <div className="shift-option">
                <button onClick={() => onShift()}>Змістити зміни</button>
            </div>

            <div className="clear-option">
                <button onClick={() => onClear()}>Очистити</button>
            </div>
        </div>
    )
}