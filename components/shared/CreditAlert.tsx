import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
  
function CreditAlert() {
    const router = useRouter()
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex-between">
            <p className="font-semibold">Insufficient Credits</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/")}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="credit coins"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>

          <Image
            src="/assets/images/stacked-coins.png"
            alt="credit coins"
            width={462}
            height={122}
          />

          <AlertDialogTitle className="p-24-bold text-dark-600">
            Oops.... Looks like you&#39;ve run out of free credits!
          </AlertDialogTitle>

          <AlertDialogDescription className="p-16-regular py-3">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-full"
            onClick={() => router.push("/profile")}
          >
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-ful"
            onClick={() => router.push("/credits")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreditAlert