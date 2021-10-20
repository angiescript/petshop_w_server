

export const COLUMNS = [
    {
        Header: 'Image',
        accessor: 'img_url',
        Cell: tableProps => (
            <img
              src={tableProps.row.original.img_url}
              width={40}
              height={40}
              alt='Pet Picture'
            />
          )
    },

    {
        Header: 'Name',
        accessor: 'pet_name',
     
    },

    {
        Header: 'Animal type',
        accessor: 'animal',
      
    },

    {
        Header: 'Price',
        accessor: 'price',
      
    },

    {
        Header: 'Status',
        accessor: 'purchase_status',
     
    },
]