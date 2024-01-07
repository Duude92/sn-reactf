import { useState } from "react";
export const useInit = (Callback) => {
    const [init, setInit] = useState(false);

    if (!init) {
        Callback();
        setInit(true);
    }

}