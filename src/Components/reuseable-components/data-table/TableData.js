import styles from "./Table.module.css";

export default function TableData ({ tableData }) {

    return (
        <tbody>
            {tableData.map(item => {
                return (
                    <tr key = {item.id}>
                        {item.data.map((value, index) => {

                            return (
                                <td className={styles.table_data} key = {index + 1}>{value}</td>
                            ); 

                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}