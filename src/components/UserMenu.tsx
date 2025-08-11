import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/orders">
        <Button variant="outline" className="flex items-center gap-2">
          <History className="w-4 h-4" />
          My Orders
        </Button>
      </Link>
      <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
};