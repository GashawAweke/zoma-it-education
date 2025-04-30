import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import {
  AlertCircle,
  LigatureIcon as Bandage,
  Heart,
  Info,
} from 'lucide-react';

const FirstAid = () => {
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>First Aid Resources</h1>

      <Tabs defaultValue='emergency'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='emergency'>Emergency Procedures</TabsTrigger>
          <TabsTrigger value='supplies'>First Aid Supplies</TabsTrigger>
          <TabsTrigger value='guides'>Quick Guides</TabsTrigger>
          <TabsTrigger value='training'>Training Resources</TabsTrigger>
        </TabsList>

        <TabsContent value='emergency'>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Procedures</CardTitle>
              <CardDescription>
                Step-by-step guides for handling common school emergencies
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Alert>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Emergency Contact Information</AlertTitle>
                <AlertDescription>
                  School Nurse: 555-123-4567 (ext. 234)
                  <br />
                  Emergency Services: 911
                  <br />
                  Poison Control: 1-800-222-1222
                </AlertDescription>
              </Alert>

              <div className='grid gap-4 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
                      <Heart className='mr-2 h-5 w-5 text-red-500' />
                      Cardiac Emergency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className='list-decimal pl-5 space-y-2'>
                      <li>Call for help and dial emergency services (911)</li>
                      <li>Begin CPR if trained</li>
                      <li>Send someone to retrieve the AED</li>
                      <li>Continue CPR until help arrives</li>
                      <li>Document the incident</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
                      <Bandage className='mr-2 h-5 w-5 text-red-500' />
                      Severe Bleeding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className='list-decimal pl-5 space-y-2'>
                      <li>Apply direct pressure to the wound</li>
                      <li>Elevate the injured area if possible</li>
                      <li>Call for help and dial emergency services (911)</li>
                      <li>Apply a clean bandage</li>
                      <li>Monitor for signs of shock</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='supplies'>
          <Card>
            <CardHeader>
              <CardTitle>First Aid Supplies</CardTitle>
              <CardDescription>
                Inventory and locations of first aid kits throughout the school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>First Aid Kit Locations</h3>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>Main Office</li>
                  <li>Nurse's Office</li>
                  <li>Gymnasium</li>
                  <li>Science Labs</li>
                  <li>Cafeteria</li>
                  <li>Each Floor Hallway</li>
                </ul>

                <h3 className='text-lg font-medium mt-6'>
                  Standard Kit Contents
                </h3>
                <div className='grid gap-4 md:grid-cols-2'>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>Adhesive bandages (various sizes)</li>
                    <li>Sterile gauze pads</li>
                    <li>Adhesive tape</li>
                    <li>Elastic bandages</li>
                    <li>Antiseptic wipes</li>
                    <li>Antibiotic ointment</li>
                  </ul>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>Scissors</li>
                    <li>Tweezers</li>
                    <li>Disposable gloves</li>
                    <li>CPR face shield</li>
                    <li>Instant cold packs</li>
                    <li>First aid manual</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='guides'>
          <Card>
            <CardHeader>
              <CardTitle>Quick Guides</CardTitle>
              <CardDescription>
                Reference materials for common first aid situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Cuts and Scrapes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className='list-decimal pl-5 space-y-1 text-sm'>
                      <li>Clean hands with soap and water</li>
                      <li>Rinse the wound with clean water</li>
                      <li>Apply antibiotic ointment</li>
                      <li>Cover with a sterile bandage</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Sprains</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className='list-decimal pl-5 space-y-1 text-sm'>
                      <li>Rest the injured area</li>
                      <li>Apply ice for 20 minutes</li>
                      <li>Compress with an elastic bandage</li>
                      <li>Elevate the injured limb</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Allergic Reactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className='list-decimal pl-5 space-y-1 text-sm'>
                      <li>Check student's allergy action plan</li>
                      <li>Administer epinephrine if prescribed</li>
                      <li>Call emergency services</li>
                      <li>Monitor breathing and consciousness</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='training'>
          <Card>
            <CardHeader>
              <CardTitle>Training Resources</CardTitle>
              <CardDescription>
                Educational materials and certification opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-medium mb-2'>
                    Upcoming Training Sessions
                  </h3>
                  <ul className='list-disc pl-5 space-y-2'>
                    <li>Basic First Aid - June 15, 2023</li>
                    <li>CPR Certification - July 8, 2023</li>
                    <li>AED Training - July 22, 2023</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-medium mb-2'>Online Resources</h3>
                  <ul className='list-disc pl-5 space-y-2'>
                    <li>
                      <a href='#' className='text-blue-600 hover:underline'>
                        Red Cross First Aid App
                      </a>
                    </li>
                    <li>
                      <a href='#' className='text-blue-600 hover:underline'>
                        First Aid Training Videos
                      </a>
                    </li>
                    <li>
                      <a href='#' className='text-blue-600 hover:underline'>
                        Emergency Response Guidelines
                      </a>
                    </li>
                  </ul>
                </div>

                <Alert variant='outline' className='bg-blue-50'>
                  <Info className='h-4 w-4' />
                  <AlertTitle>Staff Certification Status</AlertTitle>
                  <AlertDescription>
                    View and track staff first aid certification status in the{' '}
                    <a href='#' className='font-medium underline'>
                      Staff Portal
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirstAid;
