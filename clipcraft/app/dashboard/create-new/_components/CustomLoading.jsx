import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
                    <div className="flex flex-col items-center my-10 justify-center">
                        <Image src="/loading.gif" width={100} height={100} alt="Loading..." />
                        <h2 className="text-lg font-medium text-center">
                            Please stand by. Your video is being generated...
                        </h2>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CustomLoading;