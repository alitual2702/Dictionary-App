import React, { useEffect, useState } from "react";
import "./dictionary.css";
const DictionaryApi = () => {
    const [isTrue, setisTrue] = useState(true);
    const [err, seterr] = useState("Empty...");
    const [alp, setalp] = useState(null);
    const [wordMean, setwordMean] = useState("");
    const [name, setname] = useState("");
    function clearAll() {
        setname("");
        seterr("Empty...");
        setwordMean("");
        setisTrue(true);
    }
    async function getWord() {
        try {
            if (name != "") {
                let dicapi = await fetch(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
                );
                let word = await dicapi.json();

                setwordMean(Array(word[0].meanings[0].definitions)[0]);
                setalp(word[0].word);
                setname("");
                setisTrue(false);
            }
        } catch (error) {
            if (name == "") {
                seterr("Empty...");
            } else {
                seterr(<h1>Pagal hai kya...</h1>);
                setisTrue(false);
            }
        }
    }
    useEffect(() => {
        getWord();
    }, [setname]);

    return (
        <div className="dic-wrapper">
            <h1>Dictionary</h1>

            <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Search..."
            />
            <div className="search">
                {isTrue ? (
                    <button className="get" onClick={() => getWord()}>
                        Get
                    </button>
                ) : (
                    <button
                        className="clear"
                        onClick={() => {
                            clearAll();
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
            {wordMean ? (
                <>
                    <p
                        style={{
                            marginBottom: "0.5rem",
                            textTransform: "capitalize",
                        }}
                    >
                        Word : <strong>{alp}</strong>
                    </p>
                    {wordMean.map((valueAll, index) => {
                        return (
                            <p
                                key={index}
                                style={{
                                    wordBreak: "break-word",
                                    marginBottom: "0.5rem",
                                }}
                                className="meaning"
                            >
                                <strong>definition</strong> {index + 1} : {valueAll.definition}
                            </p>
                        );
                    })}
                </>
            ) : (
                err
            )}
        </div>
    );
};

export default DictionaryApi;
