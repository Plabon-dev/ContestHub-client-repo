
import Card from './Card';
const ContestTab = ({items}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 content-center gap-8 p-10'>
        {
            items.map(item => <Card
            key={item._id}
            item={item}
            ></Card>)
        }
        
        </div>
    );
};

export default ContestTab;