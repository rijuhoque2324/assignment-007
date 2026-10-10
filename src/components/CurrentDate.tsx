"use client";

const CurrentDate = () => {
    const date = new Date();

    const banglaFormat = date.toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <div>
            {banglaFormat}
        </div>
    );
};

export default CurrentDate;