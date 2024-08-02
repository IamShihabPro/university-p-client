import { Button, Col, Flex } from 'antd';
import PHForm from '../../../components/form/PHForm';
// import PHInput from '../../../components/form/PHInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHSelect from '../../../components/form/PHSelect';
import { monthOptions } from '../../../constants/global';
import { semesterOptions } from '../../../constants/semester';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/feature/admin/academicManagement.api';
import { toast } from 'sonner';
import { TResponse } from '../../../types/global';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const createAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation()

    const onsubmit: SubmitHandler<FieldValues> = async (data) =>{
        const toastId = toast.loading('Creating...');

        const name = semesterOptions[Number(data?.name) - 1]?.label;
        console.log(name)

        const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
        };

        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse;
            console.log(res);
            if (res.error) {
              toast.error(res?.error?.data?.message, { id: toastId });
            } else {
              toast.success('Semester created', { id: toastId });
            }
          } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }

       
    }
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm onSubmit={onsubmit} resolver={zodResolver(academicSemesterSchema)}>
                    <PHSelect label="Name" name="name" options={semesterOptions} />
                    <PHSelect label="Year" name="year" options={yearOptions} />
                    <PHSelect label="Start Month" name="startMonth" options={monthOptions} />
                    <PHSelect label="End Month" name="endMonth" options={monthOptions} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default createAcademicSemester;