
export default function Hiccup() {
    return (
        <div class="flex flex-col items-center">
            <p>26</p>
            <div dangerouslySetInnerHTML={{ __html: `
                <button onclick="playAudio()" type="button">Click here to Hiccup</button>` 
            }} />
        </div>
    )
}
