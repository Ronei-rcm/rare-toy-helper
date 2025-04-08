
// Declare all UI components to fix TypeScript import errors
declare module '@/components/ui/button' {
  import { Button, ButtonProps, buttonVariants } from '../../components/ui/button';
  export { Button, ButtonProps, buttonVariants };
}

declare module '@/components/ui/input' {
  import { Input } from '../../components/ui/input';
  export { Input };
}

declare module '@/components/ui/tooltip' {
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
  export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
}

declare module '@/components/ui/badge' {
  import { Badge, badgeVariants } from '../../components/ui/badge';
  export { Badge, badgeVariants };
}

declare module '@/components/ui/card' {
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
  export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
}

declare module '@/components/ui/dialog' {
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
  export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger };
}

declare module '@/components/ui/label' {
  import { Label } from '../../components/ui/label';
  export { Label };
}

declare module '@/components/ui/table' {
  import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
  export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow };
}

declare module '@/components/ui/select' {
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';
  export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue };
}

declare module '@/components/ui/calendar' {
  import { Calendar } from '../../components/ui/calendar';
  export { Calendar };
}

declare module '@/components/ui/popover' {
  import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
  export { Popover, PopoverContent, PopoverTrigger };
}

declare module '@/components/ui/tabs' {
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
  export { Tabs, TabsContent, TabsList, TabsTrigger };
}

declare module '@/components/ui/switch' {
  import { Switch } from '../../components/ui/switch';
  export { Switch };
}

declare module '@/components/ui/textarea' {
  import { Textarea } from '../../components/ui/textarea';
  export { Textarea };
}

declare module '@/components/ui/slider' {
  import { Slider } from '../../components/ui/slider';
  export { Slider };
}

declare module '@/components/ui/checkbox' {
  import { Checkbox } from '../../components/ui/checkbox';
  export { Checkbox };
}

declare module '@/components/ui/separator' {
  import { Separator } from '../../components/ui/separator';
  export { Separator };
}

declare module '@/components/ui/radio-group' {
  import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
  export { RadioGroup, RadioGroupItem };
}

declare module '@/lib/utils' {
  import { cn, formatCurrency, formatDate } from '../lib/utils';
  export { cn, formatCurrency, formatDate };
}

declare module '@/components/ui/toast' {
  import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../../components/ui/toast';
  export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport };
}

declare module '@/hooks/use-toast' {
  import * as toastModule from '../hooks/use-toast';
  export = toastModule;
}
