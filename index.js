ReactDOM.render(
    <Contador />,
    document.querySelector("#root")
);
if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js");
}
