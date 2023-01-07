import React from "react";
import "./App.sass";
import $ from "jquery";

export class App extends React.Component {
    private worker?: Worker;

    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    keyUp(worker: Worker) {
        let content = $("#EnglishText").val()?.toString();
        worker?.postMessage(content);
        worker?.addEventListener("message", (event) => {
            $("#JackeseText").text(event.data);
        });
    }

    componentDidMount() {
        this.worker = new Worker(new URL("./Replace.ts", import.meta.url));
        $(() => {
            $("#EnglishText").on("keyup", () => {
                this.keyUp(this.worker!);
            });
            this.keyUp(this.worker!);
        });
    }

    render() {
        return (
            <div>
                <h1>Translate to Jackese</h1>
                <div id={"English"}>
                    <p>English:</p>
                    <textarea id={"EnglishText"} autoFocus={true} placeholder={"English"}>Insert text here...</textarea>
                </div>
                <div id={"Jackese"}>
                    <p>Jackese:</p>
                    <p id={"JackeseText"}>Jackese will appear here...</p>
                </div>
            </div>
        );
    }
}
