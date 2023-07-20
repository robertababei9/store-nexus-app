import NotFoundImage from "../../assets/images/NotFound.png"

export default function NotFound() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img className="h-full" src={NotFoundImage} alt="404 - Not found" />
        </div>
    )
}
